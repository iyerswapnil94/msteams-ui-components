import { radioButton } from 'msteams-ui-styles-core/lib/components/radio-button';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { connectTeamsComponent, InjectedTeamsProps } from '../index';
import classes from '../utils/classes';
import uniqueId from '../utils/uniqueId';

export interface RadiobuttonProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  onSelected?: (selected: boolean, value: any) => void;
  name?: string;
  value: any;
  selected?: boolean;
  label?: string;
  disabled?: boolean;
}

interface RadiobuttonState {
  id: string;
}

interface RadiobuttonContext {
  onSelected?: (selected: boolean, value: any) => void;
  value?: any;
}

class RadiobuttonInner extends React.Component<RadiobuttonProps & InjectedTeamsProps, RadiobuttonState> {
  static propTypes = {
    onSelected: PropTypes.func,
    value: PropTypes.any.isRequired,
    selected: PropTypes.bool,
    label: PropTypes.string,
  };

  static contextTypes = {
    onSelected: PropTypes.func,
    value: PropTypes.any,
  };
  context: RadiobuttonContext;

  state = { id: uniqueId('ts-rb-') };

  render() {
    const { id, name, context, disabled, className, onSelected, value, selected, label, ...rest } = this.props;

    const actuallySelected = this.isSelected();
    const themeClassNames = radioButton(context);

    return (
      <div
        data-component-type="RadioButton"
        className={classes(themeClassNames.container, className)}
        {...rest}>
        <input
          id={id}
          name={name}
          type="radio"
          className={themeClassNames.input}
          checked={actuallySelected}
          readOnly/>
        <button
          id={this.state.id}
          onClick={this.handleSelect}
          className={themeClassNames.radio}
          disabled={disabled} />
        {this.props.label ?
          <label htmlFor={this.state.id} className={themeClassNames.label}>{this.props.label}</label> : null}
        {this.props.children}
      </div>
    );
  }

  private isSelected = (): boolean => {
    if (this.context.value != null) {
      return this.context.value === this.props.value;
    }
    return this.props.selected || false;
  }

  private handleSelect = () => {
    if (this.context.onSelected) {
      this.context.onSelected(true, this.props.value);
    }
    if (this.props.onSelected) {
      this.props.onSelected(true, this.props.value);
    }
  }
}

export const Radiobutton = connectTeamsComponent(RadiobuttonInner);