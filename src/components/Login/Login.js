import React, {
	useState,
	useEffect,
	useReducer,
	useContext,
	useRef,
} from 'react';
import AuthContext from '../store/auth-context';
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';

const emailReducer = (state, action) => {
	if (action.type === 'USER_INPUT') {
		return { value: action.val, isValid: action.val.includes('@') };
	}

	if (action.type === 'INPUT_BLUR') {
		return { value: state.value, isValid: state.value.includes('@') };
	}

	return { value: '', isValid: false };
};

const passwordReducer = (state, action) => {
	if (action.type === 'USER_INPUT') {
		return { value: action.val, isValid: action.val.trim().length > 6 };
	}

	if (action.type === 'INPUT_BLUR') {
		return { value: state.value, isValid: state.value.trim().length > 6 };
	}
	return { value: '', isValid: false };
};

const Login = (props) => {
	const [formIsValid, setFormIsValid] = useState(false);

	const [emailState, dispatchEmail] = useReducer(emailReducer, {
		value: '',
		isValid: null,
	});

	const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
		value: '',
		isValid: null,
	});

	const { isValid: emailIsValid } = emailState;
	const { isValid: passwordIsValid } = passwordState;

	const authContext = useContext(AuthContext);

	const emailInputRef = useRef();
	const passwordInputRef = useRef();

	useEffect(() => {
		const identifier = setTimeout(() => {
			console.log('Checking form validity!');
			setFormIsValid(emailIsValid && passwordIsValid);
		}, 500);

		return () => {
			console.log('CLEANUP');
			clearTimeout(identifier);
		};
	}, [emailIsValid, passwordIsValid]);

	const emailChangeHandler = (event) => {
		dispatchEmail({ type: 'USER_INPUT', val: event.target.value });
	};

	const passwordChangeHandler = (event) => {
		dispatchPassword({ type: 'USER_INPUT', val: event.target.value });
	};

	const validateEmailHandler = () => {
		dispatchEmail({ type: 'INPUT_BLUR' });
	};

	const validatePasswordHandler = () => {
		dispatchPassword({ type: 'INPUT_BLUR' });
	};

	const submitHandler = (event) => {
		event.preventDefault();
		if (formIsValid) {
			authContext.onLogin(emailState.value, passwordState.value);
		} else if (!emailIsValid) {
			emailInputRef.current.focus();
		} else {
			passwordInputRef.current.focus();
		}
	};

	return (
		<Card className={classes.login}>
			<form onSubmit={submitHandler}>
				<Input
					ref={emailInputRef}
					isValid={emailIsValid}
					id="email"
					label="E-mail"
					type="email"
					value={emailState.value}
					onChange={emailChangeHandler}
					onBlue={validateEmailHandler}
				/>

				<Input
					ref={passwordInputRef}
					isValid={passwordIsValid}
					id="password"
					label="Password"
					type="password"
					value={passwordState.value}
					onChange={passwordChangeHandler}
					onBlue={validatePasswordHandler}
				/>
				<div className={classes.actions}>
					<Button type="submit" className={classes.btn}>
						Login
					</Button>
				</div>
			</form>
		</Card>
	);
};

export default Login;
