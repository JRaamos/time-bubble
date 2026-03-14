import React from "react";

import { DashboardActions, DashboardActionsItem } from "@ui/styled";
import { RowTableSearch, SearchTab, SearchTabs, SearchTabText } from "./styled";

import Input from "@components/Form/Input";
import Button from "@components/Form/Button";
import Icons from "@assets/icons";
import { Colors } from "@ui/themes/default";

export default function TableHeader({
    tabs, currentTab, setCurrentTab,
    searchExpression, setSearchExpression,
    isActive, setIsActive,
    filterLabel, searchLabel
}) { 

    return (
        <>
            <RowTableSearch toend={!tabs}>
                {
                    !tabs ? null :
                    <SearchTabs>
                        {
                            tabs?.map( (m, k) => 
                                <SearchTab active={currentTab === k} onPress={() => setCurrentTab(k)}>
                                    <SearchTabText active={currentTab === k}>
                                        { m?.title }
                                    </SearchTabText>
                                </SearchTab>
                            )
                        }
                    </SearchTabs>
                }
                <DashboardActions>
                    <>
                        {
                            typeof setSearchExpression === 'function' ? 
                                <DashboardActionsItem big>
                                    <Input placeholder={searchLabel || "Pesquisar"} search value={searchExpression} onChangeText={value => setSearchExpression(value)} />
                                </DashboardActionsItem>
                            : null
                        }
                    </>
                    <>
                        {
                            typeof setIsActive === 'function'  ? 
                                <DashboardActionsItem>
                                    <Button outline secondary onPress={() => setIsActive(!isActive)}>
                                        {
                                            isActive ? <Icons icon="close" stroke={'white'} width={20} height={20} /> : <>
                                                { filterLabel || "Filtros" }
                                            </>
                                        }
                                    </Button>
                                </DashboardActionsItem>
                            : null
                        }
                    </>
                </DashboardActions>
            </RowTableSearch>
        </>
    );
}