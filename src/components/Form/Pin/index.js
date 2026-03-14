import React, { Component } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
 
class PinInput extends Component {
    inputRefs = []
    digits = [] 
    
    state = {
        fields: []
    }

    onChange(fields, index) {
        const { digits } = this.props
        this.digits[index] = fields
        this.setState({ fields: this.digits });
        this.props.onInputChange(this.state.fields.join(''));
        if (!fields) {
            index && this.setInputFocus(index - 1);
            return;
        }
        index < (digits > 6 ? 5 : digits - 1) && this.setInputFocus(index + 1);
    }

    setInputFocus(index) {
        this.inputRefs[index].getNativeRef().focus()
    }

    keyPressHandler(e, i) {
        if (e.nativeEvent.key === 'Backspace' && i > 0) {
            this.setInputFocus(i - 1);
        }
    }

    render() {
        const { placeholder, digits, ...rest } = this.props;
        const addInputFields = [...Array(digits > 6 ? 6 : digits)]
        return (
            <View style={styles.container}>
                {
                    addInputFields.map((x, index) => {
                        return (
                            <TextInput
                                {...rest}
                                key={index}
                                value={this.state.fields[index]}
                                selectTextOnFocus={true}
                                onKeyPress={(e) => this.keyPressHandler(e, index)}
                                ref={(ref) => this.inputRefs[index] = ref}
                                autoCapitalize="none"
                                placeholder={placeholder}
                                keyboardType='numeric'
                                maxLength={1}
                                onChangeText={(text) => this.onChange(text, index)}
                            />
                        )
                    })
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default PinInput;