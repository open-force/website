import { Alert, Button, Modal } from '@salesforce/design-system-react';
import * as React from 'react';

export interface SubmitState {
  // form state
  url: string;

  // UI control
  showSuccess: boolean;
  loading: boolean;
  showForm: boolean;
  errMsg: string;
}

export class Submit extends React.Component<any, SubmitState> {

  constructor(props: any) {
    super(props);
    this.state = {
      url: '',
      loading: false,
      showForm: false,
      showSuccess: false,
      errMsg: null,
    };
  }

  public render() {
    const footerBtns = [
      <Button key='cancel' label='Close' onClick={this.closeForm} />,
    ];
    if (!this.state.showSuccess) {
      footerBtns.push(<Button key='save' label='Submit' variant='brand' onClick={this.submit} />);
    }

    return (
      <div>
        <Button
          onClick={(e: React.MouseEvent<HTMLElement>) => { this.setState({ showForm: true }); }}
        >
          Submit Repository
        </Button>
        <Modal
          isOpen={this.state.showForm}
          footer={footerBtns}
          onRequestClose={this.closeForm}
          title='New Submission'
        >
          {this.renderModalBody()}
        </Modal>
      </div>
    );
  }

  // === render methods... Good candiates for new components...
  private renderModalBody() {
    if (this.state.showSuccess) {
      return <p>Thank you for your submission.  The team will review and confirm it shortly</p>;
    }

    if (this.state.loading) {
      return <div>processing...</div>;
    }
    return (
      <div>
        {this.renderError()}
        <section className='slds-p-around--large'>
          <div className='slds-form-element slds-m-bottom--large'>
            <label className='slds-form-element__label' htmlFor='url'>Repository Url</label>
            <div className='slds-form-element__control'>
              <input
                id='url'
                value={this.state.url}
                onChange={(e) => { this.setState({ url: e.target.value }); }}
                className='-input'
                type='text'
                placeholder='Enter Url'
              />
            </div>
          </div>
        </section>
      </div>
    );
  }

  private renderError() {
    if (!this.state.errMsg) {
      return null;
    }

    return (
      <Alert
        // icon={<Icon category='utility' name='error' />}
        labels={{
          heading: this.state.errMsg,
        }}
        variant='error'
      />
    );

  }

  private submit = async () => {
    this.setState({ errMsg: null, loading: true });
    // do callout
    const payload: ResourceSubmission = {
      url: this.state.url,
    };
    try {
      const resp = await fetch('/api/submit', {
        method: 'post',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (resp.status !== 200) {
        throw new Error(resp.statusText);
      }
      this.setState({ url: '', showSuccess: true, loading: false });
    } catch (e) {
      this.setState({ errMsg: e.toString(), loading: false });
    }

  }

  private closeForm = () => {
    this.setState({ showForm: false, showSuccess: false, url: '', errMsg: null });
  }

}
