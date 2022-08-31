import { Button, Form, Input, Message } from "semantic-ui-react";
import { useState } from "react";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { useRouter } from "next/router";

function NewCampaign() {
  const [minimumContribution, setMinimumContribution] = useState("");
  const [campTitle, setCampTitle] = useState("");
  const [campDescription, setCampDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function formSubmitHandler(event) {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createCampaign(minimumContribution, campTitle, campDescription)
        .send({ from: accounts[0] });
      setIsLoading(false);
      router.push("/");
    } catch (err) {
      setIsLoading(false);
      setErrorMessage(err.message);
    }
  }

  return (
    <div>
      <h2> Create a Campaign</h2>
      {isLoading && (
        <Button loading primary>
          Loading
        </Button>
      )}

      {!isLoading && (
        <Form onSubmit={formSubmitHandler} error={!!errorMessage}>
          <Form.Field>
            <label>Campaign Title :</label>
            <Input
              value={campTitle}
              onChange={(event) => setCampTitle(event.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Campaign Description :</label>
            <Input
              value={campDescription}
              onChange={(event) => setCampDescription(event.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Minimum Contribution :</label>
            <Input
              value={minimumContribution}
              onChange={(event) => setMinimumContribution(event.target.value)}
              label="wei"
              labelPosition="right"
            />
          </Form.Field>
          <Message error header="Error!" content={errorMessage} />
          <Button content="Create Campaign" primary />
        </Form>
      )}
    </div>
  );
}

export default NewCampaign;
