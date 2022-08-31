import { Table, Button } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import Campaign from "../ethereum/campaign";
import { useRouter } from "next/router";

function RequestRow(props) {
  const { Row, Cell } = Table;
  const router = useRouter();
  async function approveRequestHandler() {
    const accounts = await web3.eth.getAccounts();
    const campaign = Campaign(props.address);

    await campaign.methods.approveRequest(props.id).send({
      from: accounts[0],
    });
    router.reload();
  }

  async function finalizeRequestHandler() {
    const accounts = await web3.eth.getAccounts();
    const campaign = Campaign(props.address);

    await campaign.methods.finalizeRequest(props.id).send({
      from: accounts[0],
    });
    router.reload();
  }

  const readyToFinalize =
    props.request.approvalCount > props.request.approversCount / 2;

  return (
    <Row disabled={props.request.complete} positive={readyToFinalize}>
      <Cell>{props.id}</Cell>
      <Cell>{props.request.description}</Cell>
      <Cell>{web3.utils.fromWei(props.request.value, "ether")}</Cell>
      <Cell>{props.request.recipient}</Cell>
      <Cell>
        {props.request.approvalCount}/{props.approversCount}
      </Cell>
      <Cell>
        {!props.request.complete && (
          <Button color="green" basic onClick={approveRequestHandler}>
            Approve
          </Button>
        )}
      </Cell>
      <Cell>
        {!props.request.complete && (
          <Button color="blue" basic onClick={finalizeRequestHandler}>
            Finalize
          </Button>
        )}
      </Cell>
    </Row>
  );
}
export default RequestRow;
