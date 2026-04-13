import React from 'react'

import ContainerAuthenticated from '@containers/Authenticated'
import ColorPicker from '@components/ColorPicker'
import Toggle from '@components/Form/Toggle'

import useController from './controller'

import {
    BrandBubble,
    BrandCopy,
    CustomizeCard,
    CustomizeDivider,
    CustomizeHint,
    CustomizeFontsScroll,
    CustomizeItemDescription,
    CustomizeItemIcon,
    CustomizeItemLabel,
    CustomizeItemLabelGroup,
    CustomizeItemRow,
    CustomizeItemStack,
    CustomizeOptionLabel,
    CustomizeOptionPreview,
    CustomizeOptionPreviewLabel,
    CustomizeOptionPreviewSample,
    CustomizeOptionPreviewValue,
    CustomizeToggle,
    CustomizeToggleCopy,
    CustomizeToggleHint,
    CustomizeToggleLabel,
    CustomizeToggleMarker,
    CustomizeToggleRow,
    CustomizeTitle,
    DonationButton,
    DonationButtonIcon,
    DonationButtonText,
    DonationCard,
    DonationCopy,
    DonationEyebrow,
    DonationHint,
    DonationLabel,
    DonationQrFrame,
    DonationQrCode,
    DonationTitle,
    DonationValue,
    Eyebrow,
    GestureBullet,
    GestureList,
    GestureRow,
    GestureText,
    GestureTitle,
    Hero,
    HeroRow,
    HeroText,
    HeroTitle,
    PrimaryAction,
    PrimaryActionIcon,
    PrimaryActionText,
    Screen,
    SummaryCard,
    SummaryGrid,
    SummaryLabel,
    SummaryText,
    SummaryValue,
} from './styled'

export default function Home() {
    const {
        busy,
        backgroundHex,
        fontKey,
        fontOptions,
        handleCommitBackground,
        handleCommitText,
        handleCopyPixKey,
        handlePrimaryAction,
        handlePreviewBackground,
        handlePreviewText,
        handleSelectFont,
        handleToggleOpenOnLaunch,
        handleToggleMilliseconds,
        openOnAppLaunch,
        overlayVisible,
        permissionGranted,
        platformIsAndroid,
        pixCopied,
        pixPayload,
        pixKey,
        pixOwner,
        showMilliseconds,
        textHex,
    } = useController()

    return (
        <ContainerAuthenticated keep noHeader backgrounded>
            <Screen>
                <Hero>
                    <HeroRow>
                        <BrandBubble>
                            <PrimaryActionIcon />
                        </BrandBubble>
                        <BrandCopy>
                            <Eyebrow>Cronômetro flutuante</Eyebrow>
                            <HeroTitle>Cronômetro flutuante</HeroTitle>
                        </BrandCopy>
                    </HeroRow>
                    <HeroText>
                        Abra o card sobre outros apps, toque uma vez para iniciar ou pausar, toque duas vezes para zerar e arraste livremente pela tela.
                    </HeroText>
                    <PrimaryAction disabled={busy || !platformIsAndroid} onPress={handlePrimaryAction}>
                        <PrimaryActionText>
                            {!platformIsAndroid ? 'Disponivel apenas no Android' : permissionGranted ? 'Abrir cronometro flutuante' : 'Liberar permissao de sobreposicao'}
                        </PrimaryActionText>
                    </PrimaryAction>
                </Hero>

                <GestureList>
                    <GestureTitle>Gestos do card</GestureTitle>
                    <GestureRow>
                        <GestureBullet />
                        <GestureText>Toque simples alterna entre iniciar e pausar.</GestureText>
                    </GestureRow>
                    <GestureRow>
                        <GestureBullet />
                        <GestureText>Duplo toque zera imediatamente o cronometro.</GestureText>
                    </GestureRow>
                    <GestureRow>
                        <GestureBullet />
                        <GestureText>Arrastar move o cronometro e evita disparar toques acidentais.</GestureText>
                    </GestureRow>
                    <GestureRow>
                        <GestureBullet />
                        <GestureText>Use dois dedos em pinça para deixar o cronometro maior ou menor.</GestureText>
                    </GestureRow>
                    <GestureRow>
                        <GestureBullet />
                        <GestureText>Pressione por alguns segundos para revelar o botao de fechar no proprio float.</GestureText>
                    </GestureRow>
                    <GestureRow>
                        <GestureBullet />
                        <GestureText>Quando o botao aparecer, tocar no cronometro fora dele apenas esconde o fechamento.</GestureText>
                    </GestureRow>
                </GestureList>
                <CustomizeCard>
                    <CustomizeTitle>Visual do floating</CustomizeTitle>
                    <CustomizeHint>
                        Ajuste comportamento, fonte e cor. Tudo aplica no floating em tempo real.
                    </CustomizeHint>
                    <CustomizeDivider />

                    <CustomizeToggle active={showMilliseconds}>
                        <CustomizeToggleRow>
                            <CustomizeToggleCopy>
                                <CustomizeToggleLabel>Mostrar Milissegundos</CustomizeToggleLabel>
                                <CustomizeToggleHint subtle>
                                    Ative so quando quiser uma leitura mais precisa.
                                </CustomizeToggleHint>
                            </CustomizeToggleCopy>
                            <Toggle disabled={busy} onChange={handleToggleMilliseconds} timer value={showMilliseconds} />
                        </CustomizeToggleRow>
                    </CustomizeToggle>

                    <CustomizeToggle active={openOnAppLaunch}>
                        <CustomizeToggleRow>
                            <CustomizeToggleCopy>
                                <CustomizeToggleLabel>Abrir floating ao entrar</CustomizeToggleLabel>
                                <CustomizeToggleHint subtle>
                                    Com permissao liberada, o app abre direto no floating.
                                </CustomizeToggleHint>
                            </CustomizeToggleCopy>
                            <Toggle disabled={busy} onChange={handleToggleOpenOnLaunch} timer value={openOnAppLaunch} />
                        </CustomizeToggleRow>
                    </CustomizeToggle>

                    <CustomizeItemStack>
                        <CustomizeToggle>

                            <CustomizeItemRow>
                                <CustomizeItemLabelGroup>
                                    <CustomizeItemLabel>Fonte dos numeros</CustomizeItemLabel>
                                    <CustomizeItemDescription>Role lateralmente e toque para aplicar.</CustomizeItemDescription>
                                </CustomizeItemLabelGroup>
                            </CustomizeItemRow>

                            <CustomizeFontsScroll>
                                {fontOptions.map(item => (
                                    <CustomizeOptionPreview
                                        active={fontKey === item.key}
                                        disabled={busy}
                                        key={item.key}
                                        onPress={() => handleSelectFont(item.key)}
                                    >
                                        <CustomizeOptionPreviewSample>
                                            <CustomizeOptionPreviewValue active={fontKey === item.key} fontFamily={item.previewFont} letterSpacing={item.previewSpacing}>{item.previewValue}</CustomizeOptionPreviewValue>
                                        </CustomizeOptionPreviewSample>
                                        <CustomizeOptionPreviewLabel active={fontKey === item.key}>{item.label}</CustomizeOptionPreviewLabel>
                                    </CustomizeOptionPreview>
                                ))}
                            </CustomizeFontsScroll>
                        </CustomizeToggle>
                    </CustomizeItemStack>

                    <CustomizeItemStack>
                        <CustomizeItemRow>
                            <CustomizeItemLabelGroup>
                                <CustomizeItemLabel>Cor do floating</CustomizeItemLabel>
                                <CustomizeItemDescription>Escolha a cor do fundo do cronometro flutuante.</CustomizeItemDescription>
                            </CustomizeItemLabelGroup>
                        </CustomizeItemRow>
                    </CustomizeItemStack>

                    <ColorPicker onChange={handlePreviewBackground} onComplete={handleCommitBackground} value={backgroundHex} />

                    <CustomizeItemStack>
                        <CustomizeItemRow>
                            <CustomizeItemLabelGroup>
                                <CustomizeItemLabel>Cor do texto</CustomizeItemLabel>
                                <CustomizeItemDescription>Escolha a cor dos numeros para manter contraste e leitura.</CustomizeItemDescription>
                            </CustomizeItemLabelGroup>
                        </CustomizeItemRow>

                    </CustomizeItemStack>

                    <ColorPicker
                        hint="Escolha a cor exata dos numeros para manter contraste e leitura."
                        label="Cor dos numeros"
                        last
                        onChange={handlePreviewText}
                        onComplete={handleCommitText}
                        value={textHex}
                    />
                </CustomizeCard>
                <SummaryGrid>
                    <SummaryCard active={permissionGranted}>
                        <SummaryLabel>Permissao</SummaryLabel>
                        <SummaryValue>{permissionGranted ? 'Liberada' : 'Pendente'}</SummaryValue>
                        <SummaryText>
                            {permissionGranted ? 'O Android ja autorizou a sobreposicao e o card pode ser aberto acima de outros apps.' : 'Ao tocar no botao, o app abre a configuracao do Android para liberar a sobreposicao.'}
                        </SummaryText>
                    </SummaryCard>
                    <SummaryCard active={overlayVisible}>
                        <SummaryLabel>Overlay</SummaryLabel>
                        <SummaryValue>{overlayVisible ? 'Ativo agora' : 'Fechado'}</SummaryValue>
                        <SummaryText>
                            {overlayVisible ? 'O service nativo esta vivo e o card continua contando mesmo com o app em segundo plano.' : 'Quando aberto, o cronometro fica em foreground service para reduzir interrupcoes do sistema.'}
                        </SummaryText>
                    </SummaryCard>
                </SummaryGrid>



                <DonationCard>
                    <DonationEyebrow>Apoie o desenvolvimento</DonationEyebrow>
                    <DonationTitle>Pix para contribuir com o app</DonationTitle>
                    <DonationHint>
                        Se o TimeBubble estiver sendo util para voce, pode apoiar a evolucao do projeto com um Pix.
                    </DonationHint>

                    <DonationQrFrame>
                        <DonationQrCode value={pixPayload} />
                    </DonationQrFrame>

                    <DonationButton onPress={handleCopyPixKey}>
                        <DonationButtonIcon />
                        <DonationButtonText>{pixCopied ? 'Chave Pix copiada' : 'Copiar chave Pix'}</DonationButtonText>
                    </DonationButton>

                    <DonationCopy>
                        <DonationLabel>Nome</DonationLabel>
                        <DonationValue>{pixOwner}</DonationValue>
                    </DonationCopy>

                    <DonationCopy>
                        <DonationLabel>Chave Pix</DonationLabel>
                        <DonationValue>{pixKey}</DonationValue>
                    </DonationCopy>
                </DonationCard>

            </Screen>
        </ContainerAuthenticated >
    )
}
