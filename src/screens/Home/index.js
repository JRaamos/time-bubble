import React from 'react'

import ContainerAuthenticated from '@containers/Authenticated'
import ColorPicker from '@components/ColorPicker'

import useController from './controller'

import {
    BrandBubble,
    BrandCopy,
    CustomizeCard,
    CustomizeHint,
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
    InlineActions,
    Preview,
    PreviewBubble,
    PreviewHeader,
    PreviewHint,
    PreviewTag,
    PreviewTagText,
    PreviewTime,
    PreviewTitle,
    PrimaryAction,
    PrimaryActionIcon,
    PrimaryActionText,
    Screen,
    SecondaryAction,
    SecondaryActionText,
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
        formattedElapsed,
        handleCommitBackground,
        handleCommitText,
        handleCopyPixKey,
        handleHideOverlay,
        handlePrimaryAction,
        handlePreviewBackground,
        handlePreviewText,
        loading,
        overlayVisible,
        permissionGranted,
        platformIsAndroid,
        pixCopied,
        pixPayload,
        pixKey,
        pixOwner,
        textHex,
        timerRunning,
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
                            <Eyebrow>TimeBubble</Eyebrow>
                            <HeroTitle>Cronometro flutuante</HeroTitle>
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
                        <GestureText>Duplo toque zera imediatamente para 00:00.000.</GestureText>
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

                <Preview>
                    <PreviewHeader>
                        <PreviewTitle>Estado do cronometro</PreviewTitle>
                        <PreviewTag active={overlayVisible}>
                            <PreviewTagText>{timerRunning ? 'Rodando' : overlayVisible ? 'Pausado' : 'Pronto'}</PreviewTagText>
                        </PreviewTag>
                    </PreviewHeader>
                    <PreviewBubble backgroundHex={backgroundHex}>
                        <PreviewTime textHex={textHex}>{formattedElapsed}</PreviewTime>
                    </PreviewBubble>
                    <PreviewHint>
                        {loading ? 'Sincronizando o estado atual do cronometro.' : permissionGranted ? 'Depois de abrir o card, o controle principal acontece diretamente no overlay nativo.' : 'Se o aparelho nao expuser essa permissao, o Android pode bloquear esse recurso no proprio sistema.'}
                    </PreviewHint>
                    {
                        overlayVisible ? (
                            <InlineActions>
                                <SecondaryAction first onPress={handlePrimaryAction}>
                                    <SecondaryActionText>Trazer de volta</SecondaryActionText>
                                </SecondaryAction>
                                <SecondaryAction danger onPress={handleHideOverlay}>
                                    <SecondaryActionText>Fechar overlay</SecondaryActionText>
                                </SecondaryAction>
                            </InlineActions>
                        ) : null
                    }
                </Preview>

                <CustomizeCard>
                    <CustomizeTitle>Visual do floating</CustomizeTitle>
                    <CustomizeHint>
                        A escolha acontece na tela React Native, mas as cores sao salvas no aparelho e aplicadas no overlay nativo.
                    </CustomizeHint>

                    <ColorPicker
                        hint="Defina a cor real do card flutuante com toque e arraste."
                        label="Cor do floating"
                        onChange={handlePreviewBackground}
                        onComplete={handleCommitBackground}
                        value={backgroundHex}
                    />

                    <ColorPicker
                        hint="Escolha a cor exata dos numeros para manter contraste e leitura."
                        label="Cor dos numeros"
                        last
                        onChange={handlePreviewText}
                        onComplete={handleCommitText}
                        value={textHex}
                    />
                </CustomizeCard>

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
        </ContainerAuthenticated>
    )
}
