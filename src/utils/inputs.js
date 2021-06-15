import React from 'react'
import PropTypes from 'prop-types'
// import 'react-datepicker/dist/react-datepicker.css'
import { messages } from './validations'
import { Controller, useFormContext } from 'react-hook-form'
import { get } from 'lodash'
import { ErrorMessage } from '@hookform/error-message'
import { FormGroup, Radio, Input, Form, TextArea, Checkbox, Dropdown, Select } from 'semantic-ui-react'


export const renderInput = ({ meta: { touched, error }, label, inline, width, ...custom }) => (
  <Form.Field error={error && touched} width={width} inline={inline}>
    {label &&
    <label>{label}</label>
    }
    <Input {...custom} error={error && touched} autoComplete="off"/>
    {touched && error && <div className="ui basic red pointing prompt label transition visible">{error}</div>}
  </Form.Field>
)

export const InputHooks = ({
                             name, label, inline, rules, width, onChange = () => {
  }, defaultValue, ...custom
                           }) => {

  const { control, errors } = useFormContext()

  const getError = () => get(errors, name)

  const defVal = defaultValue === null || defaultValue === undefined ? '' : defaultValue

  return (
    <Form.Field error={getError() !== undefined} width={width} inline={inline}>
      {label &&
      <label>{label}</label>
      }

      <Controller
        control={control}
        render={(props) => (
          <Input value={props.value}
                 autoComplete="off"
                 onChange={(event) => {
                   props.onChange(event)
                   onChange(event, event.target)
                   return event
                 }}
                 onBlur={() => props.onBlur()}
                 {...custom}
          />)}
        rules={rules}
        name={name}
        defaultValue={defVal}
      />
      <ErrorMessage errors={errors} name={name} render={() => <div
        className="ui basic red pointing prompt label transition visible">{messages[getError().type]}</div>}/>
    </Form.Field>
  )
}

renderInput.propTypes = {
  meta: PropTypes.object.isRequired,
  inline: PropTypes.bool,
  width: PropTypes.number,
  disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
}

export const renderRadio = ({ meta: { touched, error }, label, inline, width, ...custom }) => (
  <Form.Field error={error && touched} width={width} inline={inline}>
    {label &&
    <label>{label}</label>
    }
    <Input {...custom} error={error && touched} autoComplete="off"/>
    {touched && error && <div className="ui basic red pointing prompt label transition visible">{error}</div>}
  </Form.Field>
)

export const RadioHooks = ({
                             name, label, items, inline, rules, onChange = () => {
  }, defaultValue, radioStyle, ...custom
                           }) => {

  const { control, errors, getValues } = useFormContext()

  const getError = () => get(errors, name)

  const defVal = defaultValue === null || defaultValue === undefined ? '' : defaultValue

  return (
    <Form.Field error={getError() !== undefined} inline={inline}>
      <Controller
        control={control}
        render={(props) => (
          <FormGroup style={{ margin: '.5em' }}>
            {items.map((item, index) => {
              return <Radio key={index}
                            label={item.label}
                            name={item.name}
                            value={item.value}
                            checked={getValues(name) === item.value}
                            onChange={(event, { value }) => {
                              props.onChange(value)
                              onChange(event, value)
                            }}
                            style={radioStyle}
                            onBlur={() => props.onBlur()}
                            {...custom}
              />
            })}
          </FormGroup>
        )}
        rules={rules}
        name={name}
        defaultValue={defVal}
      />
      <ErrorMessage errors={errors} name={name} render={() => <div
        className="ui basic red pointing prompt label transition visible">{messages[getError().type]}</div>}/>
    </Form.Field>
  )
}

renderRadio.propTypes = {
  meta: PropTypes.object.isRequired,
  inline: PropTypes.bool,
  width: PropTypes.number,
  disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
}

export const TextAreaHooks = ({ name, label, defaultValue, ...custom }) => {

  const { control, errors } = useFormContext()

  const getError = () => get(errors, name)

  return (
    <Form.Field error={getError() !== undefined}>
      {label &&
      <label>{label}</label>
      }

      <Controller control={control}
                  name={name}
                  render={(props) => <TextArea autoComplete="off"
                                               value={props.value}
                                               onChange={(event) => {
                                                 props.onChange(event)
                                                 return event
                                               }}
                                               {...custom}
                  />}
                  defaultValue={defaultValue || ''}
      />
      <ErrorMessage errors={errors} name={name} render={() => <div
        className="ui basic red pointing prompt label transition visible">{messages[getError().type]}</div>}/>
    </Form.Field>
  )
}

export const renderCheckbox = ({ meta: { touched, error }, label, input, readOnlyAttr, width }) => (
  <Form.Field error={touched && error} width={width}>
    <label>{label}</label>
    <Checkbox name={input.name}
              toggle
              readOnly={readOnlyAttr}
              checked={input.checked}
              onChange={() => input.onChange({
                target: { type: 'checkbox', checked: !input.checked },
                stopPropagation: () => {
                },
                preventDefault: () => {
                },
              })}
    />
  </Form.Field>
)

export const CheckboxHooks = ({
                                label, name, readOnlyAttr, rules, width, defaultValue, onChange = () => {
  },
                              }) => {

  const { control, errors } = useFormContext()

  const getError = () => get(errors, name)

  return (
    <Form.Field error={getError() !== undefined} width={width}>
      <label>{label}</label>
      <Controller
        control={control}
        render={(props) => <Checkbox toggle
                                     readOnly={readOnlyAttr}
                                     autoComplete="off"
                                     checked={props.value}
                                     onChange={(event, data) => {
                                       props.onChange(data.checked)
                                       onChange(event, data)
                                       return event
                                     }}
        />}
        defaultValue={defaultValue || false}
        name={name}
      />
      <ErrorMessage errors={errors} name={name} render=
        {() => <div
          className="ui basic red pointing prompt label transition visible">{messages[getError().type]}</div>}
      />
    </Form.Field>
  )
}

renderCheckbox.propTypes = {
  meta: PropTypes.object.isRequired,
  width: PropTypes.number,
  readOnlyAttr: PropTypes.bool,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  input: PropTypes.object.isRequired,
}

export const renderDropdown = ({ meta: { touched, error }, label, input, options, multiple, width, ...rest }) => (
  <Form.Field error={error && touched} width={width}>
    <label>{label}</label>
    <Select name={input.name}
            options={options}
            value={input.value}
            multiple={multiple}
            onFocus={input.onFocus}
            onBlur={(e, data) => input.onBlur({
              target: { type: 'select', value: data.value },
              stopPropagation: () => {
              },
              preventDefault: () => {
              },
            })}
            onChange={(e, data) => input.onChange({
              target: { type: 'select', value: data.value },
              stopPropagation: () => {
              },
              preventDefault: () => {
              },
            })}
            {...rest}
    />
    {touched && error && <div className="ui basic red pointing prompt label transition visible">{error}</div>}
  </Form.Field>
)

export const DropdownHooks = ({
                                clearable,
                                label,
                                name,
                                options,
                                multiple,
                                width,
                                rules,
                                validateAll,
                                defaultValue,
                                onChange = () => {
                                },
                                ...rest
                              }) => {

  const { trigger, errors, control } = useFormContext()
  const getError = () => get(errors, name)
  return (
    <Form.Field error={getError() !== undefined} width={width}>
      <label>{label}</label>
      <Controller
        control={control}
        render={(props) => <Select name={name}
                                   options={options}
                                   selection={clearable}
                                   clearable={clearable}
                                   multiple={multiple}
                                   value={props.value}
                                   onChange={async (e, data) => {
                                     props.onChange(data.value)
                                     onChange(e, data)
                                     if (validateAll) {
                                       await trigger()
                                     } else {
                                       await trigger(name)
                                     }
                                   }}
                                   {...rest}
        />}
        rules={rules}
        name={name}
        defaultValue={defaultValue || ''}
      />

      <ErrorMessage errors={errors} name={name} render=
        {() => <div
          className="ui basic red pointing prompt label transition visible">{messages[getError().type]}</div>}
      />
    </Form.Field>
  )
}


renderDropdown.propTypes = {
  meta: PropTypes.object.isRequired,
  width: PropTypes.number,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  input: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
  multiple: PropTypes.bool,
}

export const renderTextArea = ({ meta: { touched, error }, label, input, ...custom }) => (
  <Form.Field error={error && touched}>
    <label>{label}</label>
    <TextArea name={input.name}
              value={input.value}
              onChange={input.onChange}
              onBlur={input.onBlur}
              onFocus={input.onFocus}
              {...custom}
    />
    {touched && error && <div className="ui basic red pointing prompt label transition visible">{error}</div>}
  </Form.Field>
)

renderTextArea.propTypes = {
  meta: PropTypes.object.isRequired,
  input: PropTypes.object.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
}

const currencies = ['EUR', 'USD', 'CZK', 'HUF', 'PLN']

export const renderCurrencySelector = ({ meta: { touched, error }, label, input, ...custom }) => (
  <Form.Field error={error && touched}>
    <label>{label}</label>
    <Dropdown name={input.name}
              options={currencies.map(cr => ({ key: cr, value: cr, text: cr }))}
              value={input.value}
              selection
              onChange={(e, data) => input.onChange({
                target: { type: 'select', value: data.value },
                stopPropagation: () => {
                },
                preventDefault: () => {
                },
              })}
    />
    {touched && error && <div className="ui basic red pointing prompt label transition visible">{error}</div>}
  </Form.Field>
)
renderCurrencySelector.propTypes = {
  meta: PropTypes.object.isRequired,
  input: PropTypes.object.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
}

export const renderInlineCheckbox = ({ meta: { touched, error }, label, input }) => (
  <Form.Field error={error && touched}>
    <Checkbox name={input.name}
              className="input"
              toggle
              checked={input.checked}
              label={label}
              onChange={() => input.onChange({
                target: { type: 'checkbox', checked: !input.checked },
                stopPropagation: () => {
                },
                preventDefault: () => {
                },
              })}
    />
    {touched && error && <div className="ui basic red pointing prompt label transition visible">{error}</div>}
  </Form.Field>
)

renderInlineCheckbox.propTypes = {
  meta: PropTypes.object.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  input: PropTypes.object.isRequired,
}


