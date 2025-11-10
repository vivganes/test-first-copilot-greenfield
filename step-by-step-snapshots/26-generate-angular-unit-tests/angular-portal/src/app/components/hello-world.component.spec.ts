import { HelloWorldComponent } from "./hello-world.component";

describe('HelloWorldComponent', () => {
    let component: HelloWorldComponent;
    beforeEach(() => {
        component = new HelloWorldComponent();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });
    
    it('should have the correct message', () => {
        expect(component.message).toBe('Hello, World!');
    });
    // Add more tests as needed
});