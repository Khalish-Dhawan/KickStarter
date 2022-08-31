import { Form, Button, Message, Input } from "semantic-ui-react";
import Campaign from "../../../../ethereum/campaign";
import web3 from "../../../../ethereum/web3";
import { useRouter } from "next/router";
import Link from "next/link";
import React, { useState } from "react";

function NewRequest() {
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const router = useRouter();
  const Address = router.query.campaignAddress;
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function formSubmitHandler(event) {
    event.preventDefault();
    const campaign = Campaign(Address);
    setIsLoading(true);
    setErrorMessage("");
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .createRequest(
          description,
          web3.utils.toWei(value, "ether"),
          recipientAddress
        )
        .send({
          from: accounts[0],
        });
      router.push(`/campaigns/${Address}/requests`);
    } catch (err) {
      setErrorMessage(err.message);
    }
    setIsLoading(false);
  }

  return (
    <React.Fragment>
      <Link href={`/campaigns/${Address}/requests`}>Back to Campaign</Link>
      <h3> Create a Request </h3>
      <Form onSubmit={formSubmitHandler} error={!!errorMessage}>
        <Form.Field>
          <label>Description</label>
          <Input
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Value </label>
          <Input
            value={value}
            onChange={(event) => setValue(event.target.value)}
            label="ether"
            labelPosition="right"
          />
        </Form.Field>
        <Form.Field>
          <label>Recipient</label>
          <Input
            value={recipientAddress}
            onChange={(event) => setRecipientAddress(event.target.value)}
          />
        </Form.Field>
        <Message error header="Error!" content={errorMessage} />
        {isLoading && <Button loading primary />}
        {!isLoading && <Button primary> Create!</Button>}
      </Form>
    </React.Fragment>
  );
}
export default NewRequest;
