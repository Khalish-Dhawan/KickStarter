import { Button, Table } from "semantic-ui-react";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import Campaign from "../../../../ethereum/campaign";
import RequestRow from "../../../../components/RequestRow";

function ViewRequests(props) {
  const router = useRouter();
  const Address = router.query.campaignAddress;
  const { Header, Row, HeaderCell, Body } = Table;

  function renderRow() {
    return props.requests.map((request, index) => {
      return (
        <RequestRow
          approversCount={props.approversCount}
          request={request}
          key={index}
          address={Address}
          id={index}
        />
      );
    });
  }

  return (
    <React.Fragment>
      <h1>Requests</h1>
      <Link href={`/campaigns/${Address}/requests/new`}>
        <Button primary floated="right" style={{ marginBottom: 10 }}>
          Add Request
        </Button>
      </Link>
      <Table>
        <Header>
          <Row>
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Description</HeaderCell>
            <HeaderCell>Amount</HeaderCell>
            <HeaderCell>Recipient</HeaderCell>
            <HeaderCell>Approval Count</HeaderCell>
            <HeaderCell>Approve</HeaderCell>
            <HeaderCell>Finalize</HeaderCell>
          </Row>
        </Header>
        <Body>{renderRow()}</Body>
      </Table>
      <div> Found {props.requestCount} requests.</div>
    </React.Fragment>
  );
}

export async function getServerSideProps(context) {
  const address = context.params.campaignAddress;
  const campaign = Campaign(address);
  const requestCount = await campaign.methods.getrequestCounts().call();
  const approversCount = await campaign.methods.approversCount().call();
  // We cannot import the array of requests directly since it is the array of user-defined datatype.So we do this

  const promises = [];

  for (let i = 0; i < requestCount; i++) {
    promises.push(campaign.methods.requests(i).call());
  }

  const requests = await Promise.all(promises);

  const res = [];
  requests.forEach((r) => {
    res.push(Object.assign({}, { ...r }));
  });

  return {
    props: {
      requests: res,
      requestCount: requestCount,
      approversCount: approversCount,
    },
  };
}
export default ViewRequests;
