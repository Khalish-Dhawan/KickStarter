import React from "react";
import { Card, Button } from "semantic-ui-react";
import factory from "../ethereum/factory";
import Link from "next/link";

function HomePage(props) {
  function renderCampaigns() {
    const items = props.campaigns.map((address) => {
      return {
        header: address,
        description: <Link href={`/campaigns/${address}`}> View Campaign</Link>,
        fluid: true,
        style: { overflowWrap: "break-word" },
      };
    });

    return <Card.Group items={items}></Card.Group>;
  }

  return (
    <div>
      <h3>Open Campaigns</h3>
      <Link href="/campaigns/new">
        <Button
          floated="right"
          content="Create Campaigns"
          icon="add"
          primary
          style={{ marginTop: 10 }}
        />
      </Link>
      {renderCampaigns()}
    </div>
  );
}

export async function getStaticProps() {
  const campaigns = await factory.methods.getDeployedCampaigns().call();

  return {
    props: {
      campaigns: campaigns,
    },
  };
}

export default HomePage;
