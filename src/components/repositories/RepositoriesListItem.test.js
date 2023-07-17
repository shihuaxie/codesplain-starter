import {screen, render} from "@testing-library/react";
import {MemoryRouter} from "react-router";
import RepositoriesListItem from "./RepositoriesListItem";

function renderComponent() {
    const repository = {
        full_name: 'Facebook/react',
        language: 'Javascript',
        description: 'A js library',
        owner: {
            login: 'facebook',
        },
        name: 'react',
        html_url: 'https://github.com/facebook/react',
    }
    render(
        <MemoryRouter>
            <RepositoriesListItem repository={repository}/>
        </MemoryRouter>
    )
    return {repository};
}

test('it should display the link of the repository on the right side', async () => {
    const {repository} = renderComponent();
    await screen.findByRole('img', {name: 'Javascript'});

    const link = screen.getByRole('link', {name: /github repository/i});
    expect(link).toHaveAttribute('href', repository.html_url)
});

test('shows a file icon with a appropriate icon', async () => {
    renderComponent();
    const icon = await screen.findByRole('img', {name: 'Javascript'})

    expect(icon).toHaveClass('js-icon');

})

test('shows a link to the code editor page', async () => {
    const {repository} = renderComponent();

    await screen.findByRole('img', {name: 'Javascript'});

    const link = await screen.findByRole('link', {
        name: new RegExp(repository.owner.login),
    });
    expect(link).toHaveAttribute('href', `/repositories/${repository.full_name}`)
})
//
// const pause = () => {
//     return new Promise(resolve => () => {
//         setTimeout(() => {
//         }, 100)
//     })
// }