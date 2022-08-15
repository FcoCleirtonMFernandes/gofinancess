import React from "react";

import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard";

import { 
    Container, 
    Header,
    UserWrapper,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    Icon,
    HighlightCards,
    Transactions,
    Title,
    TransactionsList,
    LogoutButton
} from './styles';

export interface DataListProps extends TransactionCardProps{
    id: string;
}

export function Dashboard() {
    const data: DataListProps[] = [
        {
            id:'1',
            type: 'positive',
            title: "Desenvolvimento de site",
            amount: "R$ 12.000,00",
            category: {
                name: 'Vendas',
                icon: 'dollar-sign'
            },
            date: "13/11/2020"
        },

        {
            id:'2',
            type: 'negative',
            title: "Comia",
            amount: "R$ 12.000,00",
            category: {
                name: 'Vendas',
                icon: 'coffee'
            },
            date: "13/11/2020"
        },

        {
            id:'3',
            type: 'negative',
            title: "Aluguel",
            amount: "R$ 12.000,00",
            category: {
                name: 'Vendas',
                icon: 'shopping-bag'
            },
            date: "13/11/2020"
        }
    ];

    return (
        <Container>
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Photo source={{ uri: 'https://avatars.githubusercontent.com/u/79455186?v=4'}} />
                        <User>
                            <UserGreeting>Olá,</UserGreeting>
                            <UserName>Cleirton</UserName>
                        </User>
                    </UserInfo>

                    <LogoutButton onPress={() => {}}>
                        <Icon name="power"/>
                    </LogoutButton>

                </UserWrapper>
            </Header>

            <HighlightCards>
                <HighlightCard
                    type="up"
                    title="Entrada"
                    amount="R$ 17.000,00"
                    lastTransaction="Última entrada no dia 13 de abril"
                />
                <HighlightCard 
                    type="down"
                    title="Saidas"
                    amount="R$ 20.000,00"
                    lastTransaction="Última saída no dia 13 de abril"
                />
                <HighlightCard
                    type="total" 
                    title="Total"
                    amount="R$ 30.000,00"
                    lastTransaction="01 à 16 de abril"
                />
            </HighlightCards>

            <Transactions>
                <Title> Listagem </Title>

                <TransactionsList
                    data= {data} 
                    keyExtractor= {item => item.id } 
                    renderItem= {({ item }) => 
                                <TransactionCard data={item} /> 
                            }
                />
            </Transactions>

        </Container>
    )
}