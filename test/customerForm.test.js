import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';

import { createContainer } from './domManipulators';
import { CustomerForm } from '../src/CustomerForm';

describe('CustomerForm', () => {
  let render, container;

  beforeEach(() => {
    ({ render, container } = createContainer());
  });

  const form = id => container.querySelector(`form[id="${id}"]`);

  it('renders a form', () => {
    render(<CustomerForm />);
    expect(form('customer')).not.toBeNull();
  });

  const field = name => form('customer').elements[name];

  const expectToBeInputFieldOfTypeText = formElement => {
    expect(formElement).not.toBeNull();
    expect(formElement.tagName).toEqual('INPUT');
    expect(formElement.type).toEqual('text');
  };

  const itRendersAsATextBox = (fieldName) => {
    it('renders as a text box', () => {
      render(<CustomerForm />);
      expectToBeInputFieldOfTypeText(field(fieldName));
    });
  };

  const itIncludesTheExistingValue = (fieldName) => {
    it('includes the existing value', () => {
      render(<CustomerForm {...{ [fieldName]: 'value' }} />);
      expect(field(fieldName).value).toEqual('value');
    });
  };

  const labelFor = formElement => container.querySelector(`label[for="${formElement}"]`);

  const itRendersALabel = (labelName, labelText) => {
    it('renders a label', () => {
      render(<CustomerForm />);
      expect(labelFor(labelName)).not.toBeNull();
      expect(labelFor(labelName).textContent).toEqual(labelText);
    });
  };

  const itAssignsAnId = (id) => {
    it('assigns an id that matches the label id', () => {
      render(<CustomerForm />);
      expect(field(id).id).toEqual(id);
    });
  };

  const itSavesExistingValue = (fieldName, value) => {
    it('saves existing value when submitted', async () => {
      expect.hasAssertions();
      render(
        <CustomerForm
          {...{ [fieldName]: 'existingValue' }}
          onSubmit={props =>
            expect(props[fieldName]).toEqual(value)
          }
        />);
      ReactTestUtils.Simulate.submit(form('customer'));
    });
  };

  const itSavesNewValue = (fieldName, value) => {
    it('saves new value when submitted', async () => {
      expect.hasAssertions();
      render(
        <CustomerForm
          {...{ [fieldName]: 'existingValue' }}
          onSubmit={props =>
            expect(props[fieldName]).toEqual(value)
          }
        />);
      ReactTestUtils.Simulate.change(field(fieldName), {
        target: { value }
      });
      ReactTestUtils.Simulate.submit(form('customer'));
    });
  };

  describe('first name field', () => {
    itRendersAsATextBox('firstName');
    itIncludesTheExistingValue('firstName');
    itRendersALabel('firstName', 'First name');
    itAssignsAnId('firstName');
    itSavesExistingValue('firstName', 'existingValue');
    itSavesNewValue('firstName', 'newValue');
  });
});