import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';

// Packages
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

// Style
import style from './style';

interface Props extends TouchableOpacityProps {
  title: string;
  icon?: IconProp;
  textColor: string;
}

const Button = ({
  title,
  icon,
  onPress,
  style: userStyle,
  textColor,
}: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={[style.button, userStyle]}>
      {icon !== undefined ? (
        <FontAwesomeIcon icon={icon} style={style.icon} color={textColor} />
      ) : null}

      <Text style={[style.title, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
