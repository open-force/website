import { Icon, Tooltip } from 'antd';
import * as React from 'react';

const ICON_CONTAINER_STYLE = { marginRight: 12 };
const ICON_STYLE = { fontSize: 16, marginRight: 4 };

interface RepositoryIconProps {
  hide?: boolean;
  iconType: string;
  text?: string | number;
  hint?: string;
  link?: string;
}

export const RepositoryIcon: React.SFC<RepositoryIconProps> = (props) => {
  if (props.hide){
    return null;
  }
  let content = (
    <span style={ICON_CONTAINER_STYLE}>
        <Icon style={ICON_STYLE} type={props.iconType} theme='outlined' />{props.text}
    </span>
  );

  if (props.link) {
    content = (
      <a href={props.link}>{content}</a>
    );
  }

  if (props.hint) {
    content = (
      <Tooltip title={props.hint}>
        {content}
      </Tooltip>
    );
  }

  return content;
};
