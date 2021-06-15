import React, { useState } from 'react'
import './Login.css'
import PropTypes from 'prop-types'
import { Button, Dimmer, Form, Grid, Image, Label, Loader } from 'semantic-ui-react'
import { InputHooks } from '../../utils/inputs'
import { email } from '../../utils/validations'
import { FormProvider, useForm } from 'react-hook-form'
// import logo from '../../assets/logo.png'


const Login = ({ login, loading, closeModal }) => {

  const [errorMessage, setErrorMessage] = useState(null)
  const [passwordShown, setPasswordShown] = useState(false)

  const onSubmit = (data) => {
    login(data)
      .then(success => {
        if (success) {
          closeModal()
        } else {
          setErrorMessage('Wrong email or password!')
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        }
      })
  }

  const useFormMethods = useForm({ shouldFocusError: true, mode: 'onChange' })
  const { handleSubmit, formState } = useFormMethods
  const { isSubmitting, isValid } = formState

  return (
    <div className="wrapper" style={{ padding: '0 3em' }}>
      <Dimmer.Dimmable dimmed={loading}>
        <Dimmer active={loading} inverted>
          <Loader>Loading</Loader>
        </Dimmer>
        <div className={'wrapper'} style={{ paddingBottom: '2em' }}>
          <Image src={''}
                 size={'small'}
                 alt={'Logo here'}
          />
        </div>
        <FormProvider {...useFormMethods}>
          <Form onSubmit={handleSubmit(onSubmit)} loading={isSubmitting}>
            <Grid>
              <Grid.Row>
                <Grid.Column>
                  <InputHooks name={'email'}
                              rules={{ required: true, email }}
                              label={'Email'}
                              placeholder={'Email'}
                              error={errorMessage}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <InputHooks name={'password'}
                              rules={{ required: true }}
                              label={'Password'}
                              placeholder="Password"
                              type={passwordShown ? 'text' : 'password'}
                              icon={{
                                name: passwordShown ? 'eye slash' : 'eye',
                                link: true,
                                onClick: () => setPasswordShown(!passwordShown),
                              }}
                              error={errorMessage}
                  />
                </Grid.Column>
              </Grid.Row>
              {errorMessage &&
              <Grid.Row textAlign={'center'} style={{ paddingBottom: 0 }}>
                <Grid.Column>
                  <Label basic color="red" pointing="below">
                    Wrong email or password
                  </Label>
                </Grid.Column>
              </Grid.Row>
              }
              <Grid.Row textAlign={'center'}>
                <Grid.Column>
                  <Button type={'submit'} content={'Submit'} color={'orange'} disabled={isSubmitting || !isValid}/>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
        </FormProvider>
      </Dimmer.Dimmable>
    </div>
  )
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
}

export default Login
