import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div``;

const List = styled.ul`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
`;

const Item = styled.li`
  display: flex;
  justify-content: center;
  margin: 30px;
`;

const Slink = styled(Link)`
  display: flex;
  flex-direction: column;
`;

const Icon = styled.div`
  color: #1da1f2;
  font-size: 40px;
  width: 100%;
  text-align: center;
`;

const Text = styled.span`
  margin-top: 10px;
`;

const Navigation = ({ userObj }) => {
  return (
    <Container>
      <List>
        <Item>
          <Slink to="/">
            <Icon>
              <FontAwesomeIcon icon={faTwitter} />
            </Icon>
          </Slink>
        </Item>
        <Item>
          <Slink to="/profile">
            <Icon>
              <FontAwesomeIcon icon={faUser} />
            </Icon>
            <Text>
              {userObj?.displayName ? `${userObj.displayName}'s` : "My"} Profile
            </Text>
          </Slink>
        </Item>
      </List>
    </Container>
  );
};

export default Navigation;
