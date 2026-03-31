import React, { useEffect, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { InputField } from '../components/InputField';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenFrame } from '../components/ScreenFrame';
import { SectionHeader } from '../components/SectionHeader';
import { useAppLanguage, type AppLanguage } from '../context/AppLanguageContext';
import { getLocalizedContent } from '../data/localizedContent';
import { palette, radii } from '../theme/tokens';

type ConversationItem = {
  role: 'mother' | 'ai';
  text: string;
};

type AICopy = {
  intro: string;
  heroTitle: string;
  inputPlaceholder: string;
  inputCaption: string;
  motherLabel: string;
  aiLabel: string;
  urgent: string;
  nutrition: string;
  vaccine: string;
  movement: string;
  fallback: string;
};

const aiCopy: Record<AppLanguage, AICopy> = {
  English: {
    intro: 'Hello, I am MamaCare AI. Ask about pregnancy, newborn care, vaccines, symptoms, or clinic reminders.',
    heroTitle: 'Supportive guidance for mothers',
    inputPlaceholder: 'Type your question here',
    inputCaption: 'Use this for general guidance. Urgent danger signs still need real clinical care.',
    motherLabel: 'Mother',
    aiLabel: 'AI',
    urgent: 'This sounds urgent. Go to the nearest clinic or hospital immediately, especially if there is heavy bleeding, fever, convulsions, or trouble breathing.',
    nutrition: 'Focus on balanced meals with iron-rich foods, protein, beans, green vegetables, fruit, water, and the supplements your clinician prescribed.',
    vaccine: 'If a vaccine was missed, go back to the clinic as soon as possible for catch-up guidance. The child usually does not need to restart the full schedule.',
    movement: 'If baby movement feels reduced or something feels very different from normal, monitor closely and contact the clinic the same day for advice.',
    fallback: 'AI can help with general guidance, but it should not replace a clinician for emergencies. If symptoms feel severe or unusual, seek care immediately.',
  },
  Kiswahili: {
    intro: 'Habari, mimi ni MamaCare AI. Uliza kuhusu ujauzito, mtoto mchanga, chanjo, dalili, au vikumbusho vya kliniki.',
    heroTitle: 'Mwongozo wa kusaidia mama',
    inputPlaceholder: 'Andika swali lako hapa',
    inputCaption: 'Tumia hapa kwa ushauri wa jumla. Dalili za hatari bado zinahitaji huduma halisi ya kliniki.',
    motherLabel: 'Mama',
    aiLabel: 'AI',
    urgent: 'Hii inaonekana ya haraka. Nenda kliniki au hospitali ya karibu mara moja, hasa kama kuna damu nyingi, homa, degedege, au shida ya kupumua.',
    nutrition: 'Lenga chakula chenye uwiano mzuri na vyakula vya madini ya chuma, protini, maharagwe, mboga za majani, matunda, maji, na virutubisho ulivyoandikiwa.',
    vaccine: 'Kama chanjo ilikosekana, rudi kliniki haraka iwezekanavyo kwa mwongozo wa catch-up. Mara nyingi mtoto hahitaji kuanza ratiba upya.',
    movement: 'Kama mtoto anacheza kidogo kuliko kawaida au unaona tofauti kubwa, fuatilia kwa karibu na wasiliana na kliniki siku hiyo hiyo.',
    fallback: 'AI inaweza kusaidia kwa mwongozo wa jumla, lakini haiwezi kuchukua nafasi ya daktari wakati wa dharura. Ikiwa dalili ni kali au tofauti, tafuta huduma mara moja.',
  },
  Kinyarwanda: {
    intro: 'Muraho, ndi MamaCare AI. Baza ku gutwita, kwita ku mwana, inkingo, ibimenyetso, cyangwa kwibutswa bya kliniki.',
    heroTitle: 'Ubuyobozi bufasha mama',
    inputPlaceholder: 'Andika ikibazo cyawe hano',
    inputCaption: 'Koresha aha ku nama rusange. Ibimenyetso by’akaga biracyakeneye ubuvuzi nyabwo.',
    motherLabel: 'Mama',
    aiLabel: 'AI',
    urgent: 'Ibi birasa n’ibyihutirwa. Jya ku ivuriro cyangwa ibitaro bya hafi ako kanya, cyane cyane niba hari kuva amaraso menshi, umuriro, kugagara, cyangwa guhumeka nabi.',
    nutrition: 'Wibande ku mafunguro yuzuye arimo ibifite ubutare, poroteyine, ibishyimbo, imboga rwatsi, imbuto, amazi, n’inyunganiramirire wahawe.',
    vaccine: 'Niba urukingo rwasibwe, subira kwa muganga vuba ushobore gufashwa ku buryo bwo gukurikiza gahunda. Kenshi umwana ntatangira bundi bushya gahunda yose.',
    movement: 'Niba umwana akinisha gake cyangwa hari ikintu wumva gitandukanye cyane n’ibisanzwe, kurikirana neza kandi uvugishe ivuriro uwo munsi.',
    fallback: 'AI ishobora gufasha ku nama rusange, ariko ntisimbura muganga mu bihe by’ihutirwa. Niba ibimenyetso bikomeye cyangwa bidasanzwe, shaka ubuvuzi ako kanya.',
  },
};

function buildAdvice(prompt: string, language: AppLanguage): string {
  const normalized = prompt.toLowerCase();
  const copy = aiCopy[language];

  const urgentKeywords =
    language === 'English'
      ? ['bleed', 'fever', 'convulsion', 'breathing', 'urgent']
      : language === 'Kiswahili'
        ? ['damu', 'homa', 'degedege', 'kupumua', 'haraka']
        : ['amaraso', 'umuriro', 'gugara', 'guhumeka', 'byihuse'];

  const nutritionKeywords =
    language === 'English'
      ? ['food', 'eat', 'nutrition']
      : language === 'Kiswahili'
        ? ['chakula', 'kula', 'lishe']
        : ['ibiryo', 'kurya', 'imirire'];

  const vaccineKeywords =
    language === 'English'
      ? ['vaccine', 'immun']
      : language === 'Kiswahili'
        ? ['chanjo']
        : ['urukingo', 'inkingo'];

  const movementKeywords =
    language === 'English'
      ? ['baby', 'movement']
      : language === 'Kiswahili'
        ? ['mtoto', 'cheza']
        : ['umwana', 'kina'];

  if (urgentKeywords.some((keyword) => normalized.includes(keyword))) {
    return copy.urgent;
  }

  if (nutritionKeywords.some((keyword) => normalized.includes(keyword))) {
    return copy.nutrition;
  }

  if (vaccineKeywords.some((keyword) => normalized.includes(keyword))) {
    return copy.vaccine;
  }

  if (movementKeywords.some((keyword) => normalized.includes(keyword))) {
    return copy.movement;
  }

  return copy.fallback;
}

export function AIScreen(): React.JSX.Element {
  const { language, t } = useAppLanguage();
  const content = getLocalizedContent(language);
  const copy = aiCopy[language];
  const [question, setQuestion] = useState(content.aiStarterPrompts[0]);
  const [conversation, setConversation] = useState<ConversationItem[]>([
    {
      role: 'ai',
      text: copy.intro,
    },
  ]);

  useEffect(() => {
    setQuestion(content.aiStarterPrompts[0]);
    setConversation([{ role: 'ai', text: copy.intro }]);
  }, [content.aiStarterPrompts, copy.intro]);

  const latestAdvice = useMemo(() => conversation[conversation.length - 1], [conversation]);

  const submitQuestion = (): void => {
    if (!question.trim()) {
      return;
    }

    const answer = buildAdvice(question, language);

    setConversation((current) => [
      ...current,
      { role: 'mother', text: question },
      { role: 'ai', text: answer },
    ]);
    setQuestion('');
  };

  return (
    <ScreenFrame>
      <SectionHeader title={t('aiTitle')} subtitle={t('aiSubtitle')} />

      <View style={styles.heroBlock}>
        <Text style={styles.heroEyebrow}>MamaCare AI</Text>
        <Text style={styles.heroTitle}>{copy.heroTitle}</Text>
        <Text style={styles.heroBody}>{latestAdvice.text}</Text>
      </View>

      <View style={styles.promptRow}>
        {content.aiStarterPrompts.map((prompt) => (
          <Pressable key={prompt} onPress={() => setQuestion(prompt)} style={styles.promptChip}>
            <Text style={styles.promptChipText}>{prompt}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.askPanel}>
        <InputField
          label={t('askAI')}
          placeholder={copy.inputPlaceholder}
          value={question}
          onChangeText={setQuestion}
          autoCapitalize="sentences"
          caption={copy.inputCaption}
        />
        <PrimaryButton title={t('getAIAdvice')} onPress={submitQuestion} />
      </View>

      <View style={styles.chatThread}>
        {conversation.slice(1).map((item, index) => (
          <View
            key={`${item.role}-${index}`}
            style={[
              styles.messageRow,
              item.role === 'mother' ? styles.messageRowUser : styles.messageRowAI,
            ]}
          >
            <View
              style={[
                styles.messageBubble,
                item.role === 'mother' ? styles.messageBubbleUser : styles.messageBubbleAI,
              ]}
            >
              <Text style={styles.messageLabel}>{item.role === 'mother' ? copy.motherLabel : copy.aiLabel}</Text>
              <Text style={styles.messageText}>{item.text}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScreenFrame>
  );
}

const styles = StyleSheet.create({
  heroBlock: {
    gap: 8,
    paddingBottom: 8,
  },
  heroEyebrow: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.1,
    textTransform: 'uppercase',
    color: palette.primaryDeep,
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: palette.text,
  },
  heroBody: {
    fontSize: 15,
    lineHeight: 24,
    color: palette.textMuted,
  },
  promptRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  promptChip: {
    borderRadius: radii.pill,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: palette.white,
    borderWidth: 1,
    borderColor: palette.border,
  },
  promptChipText: {
    fontSize: 13,
    fontWeight: '700',
    color: palette.text,
  },
  askPanel: {
    gap: 16,
    paddingVertical: 6,
  },
  chatThread: {
    gap: 12,
    paddingTop: 4,
  },
  messageRow: {
    flexDirection: 'row',
  },
  messageRowUser: {
    justifyContent: 'flex-end',
  },
  messageRowAI: {
    justifyContent: 'flex-start',
  },
  messageBubble: {
    maxWidth: '88%',
    borderRadius: radii.lg,
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 6,
  },
  messageBubbleUser: {
    backgroundColor: palette.brandSoft,
  },
  messageBubbleAI: {
    backgroundColor: palette.white,
    borderWidth: 1,
    borderColor: palette.border,
  },
  messageLabel: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: palette.primaryDeep,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 22,
    color: palette.text,
  },
});
