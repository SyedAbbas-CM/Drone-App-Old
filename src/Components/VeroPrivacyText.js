import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@/Hooks'
import { useTranslation } from 'react-i18next'

const VeroPrivacyText = (props) => {
    const { t } = useTranslation()
    const { Layout, Images, Colors } = useTheme()
  return <Text style={Layout.privacyText}>{t('privacyText')}<Text style={Layout.privacyTextBold}>{t('privacyText2')}</Text></Text>;
}

export default VeroPrivacyText;