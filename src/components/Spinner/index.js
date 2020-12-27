import React, { Component } from "react";
import { 
	AsyncContainer,
	Spin,
	Container
} from './styles';
export default function asyncComponent(getComponent, store) {
    class AsyncComponent extends Component {
        static Component = null;
        state = { Component: AsyncComponent.Component };

        componentWillMount() {
            if (!this.state.Component) {
                getComponent().then(Component => {
                    AsyncComponent.Component = Component
                    this.setState({ Component })
                })
            }
        }
        render() {
            const { Component } = this.state
            if (Component) {
                return <Component {...this.props} />
            }
            return <AsyncContainer><Spin></Spin></AsyncContainer>
        }
    }
    return AsyncComponent;
}
