import React from 'react';
import './App.css';
import {Page} from './components/Page/Page'
import {VacancyPage} from './components/VacancyPage/VacancyPage'
import {BrowserRouter, Route, Switch, RouteComponentProps} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

interface MatchParams {
    url: string;
}

interface MatchProps extends RouteComponentProps<MatchParams> {
}

function App() {
    return (
        <div className="App">
            {/*<VacancyPage/>*/}
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Page}/>
                    <Route path="/:vacancyId" render={( {match}: MatchProps) => (
                        <VacancyPage url={match.url} /> )} />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
