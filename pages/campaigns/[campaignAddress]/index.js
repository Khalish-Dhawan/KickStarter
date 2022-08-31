import Campaign from "../../../ethereum/campaign";
import { Card, Grid, Button, Header, Segment } from "semantic-ui-react";
import React from "react";
import web3 from "../../../ethereum/web3";
import ContributeForm from "../../../components/ContributeForm";
import { useRouter } from "next/router";

function CampaignShow(props) {
  const router = useRouter();
  const Address = router.query.campaignAddress;

  function showRequestHandler() {
    router.push(`/campaigns/${Address}/requests`);
  }

  function renderCards() {
    const items = [
      {
        header: props.manager,
        meta: "Address of Manager",
        description:
          "Manager created this campaign and can create requests to withdraw money",
        style: { overflowWrap: "break-word" },
      },
      {
        header: props.minimumContribution,
        meta: "Minimum Contribution (wei)",
        description:
          "You must contribute this much wei to become a approver and avail future benefits ",
        style: { overflowWrap: "break-word" },
      },
      {
        header: props.reqCount,
        meta: "Number of Requests",
        description:
          "A request tries to withdraw money from the contract.Request must be approved by the approvers",
        style: { overflowWrap: "break-word" },
      },
      {
        header: props.approversCount,
        meta: "Number of Approvers",
        description:
          "Number of people who have already donated to the campaign",
        style: { overflowWrap: "break-word" },
      },
      {
        header: web3.utils.fromWei(props.balance, "ether"),
        meta: "Campaign Balance(ether)",
        description: "Amount of ether contract currently holds",
        style: { overflowWrap: "break-word" },
      },
    ];
    return <Card.Group items={items} />;
  }
  return (
    <React.Fragment>
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <Header as="h2" attached="top">
              {props.campTitle}
            </Header>
            <Segment attached>{props.campDescription}</Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={10}>{renderCards()}</Grid.Column>
          <Grid.Column width={6}>
            <ContributeForm address={Address} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Button primary onClick={showRequestHandler}>
              View Requests
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </React.Fragment>
  );
}

export async function getServerSideProps(context) {
  const address = context.params.campaignAddress;
  const campaignContract = Campaign(address);
  const summary = await campaignContract.methods.getSummary().call();
  const campTitle = await campaignContract.methods.campTitle().call();
  const campDescription = await campaignContract.methods
    .campDescription()
    .call();

  return {
    props: {
      minimumContribution: summary[0],
      balance: summary[1],
      reqCount: summary[2],
      approversCount: summary[3],
      manager: summary[4],
      campTitle: campTitle,
      campDescription: campDescription,
    },
  };
}

export default CampaignShow;
