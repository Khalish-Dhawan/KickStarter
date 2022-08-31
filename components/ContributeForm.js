import React, { useState } from "react";
import { Form, Input, Message, Button } from "semantic-ui-react";
import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";
import { useRouter } from "next/router";

function ContributeForm(props) {
  const [contribution, setContribution] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  async function formSubmitHandler(event) {
    event.preventDefault();
    const campaign = Campaign(props.address);
    setIsLoading(true);
    setErrorMessage("");
    try {
      let accounts = await web3.eth.getAccounts();
      await campaign.methods.Contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(contribution, "ether"),
      });

      router.reload();
    } catch (err) {
      setErrorMessage(err.message);
    }
    setIsLoading(false);
    setContribution("");
  }

  return (
    <React.Fragment>
      <h3> Contribute to this Campaign </h3>
      <Form onSubmit={formSubmitHandler} error={!!errorMessage}>
        <Form.Field>
          <label>Amount to Contribute :</label>
          <Input
            label="ether"
            labelPosition="right"
            value={contribution}
            onChange={(event) => setContribution(event.target.value)}
          />
        </Form.Field>
        <Message error header="Error!" content={errorMessage} />
        {isLoading && (
          <Button loading primary>
            Loading
          </Button>
        )}
        {!isLoading && <Button primary>Contribute!</Button>}
      </Form>
    </React.Fragment>
  );
}

export default ContributeForm;
