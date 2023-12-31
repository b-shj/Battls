/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'

import {v4 as uuidv4} from 'uuid'

// Semantic UI Imports
import { Grid, Button, Modal, Form} from 'semantic-ui-react'

// Redux Imports
import { useSelector, useDispatch} from 'react-redux'
import { RootState } from '../Reducers'
import { createPost } from '../Reducers/Slices/Posts'
// import sendNewPost from '../Reducers/Slices/Posts'


// Interface Imports
import { PollData } from '../Interfaces/PollData'
import { AsyncThunkAction } from '@reduxjs/toolkit'
import { Dispatch, AnyAction } from 'redux'


interface Props {
    placeholder: number
}

const MakePoll: React.FC<Props> = () => {
    const polls = useSelector((state: RootState) => state.posts);
    const isLoading = useSelector((state: RootState) => state.posts.loading);
    // const isLoading = false;
    const dispatch = useDispatch();

    const postDefault = {
        id : uuidv4(),
        userid: '000',
        optionOne: '',
        optionTwo: '',
        posterName: 'Jack Bisceglia',
        optionOneVotes: 0,
        optionTwoVotes: 0,
        userVoted: {
            voted: false,
            isOptionOne: false
        }
    }

    const [makePostClicked, setMakePostClicked] = useState<boolean>(false);
    // const [isLoading, setIsLoading] = useState<boolean>(false);
    const [newPost, setNewPost] = useState<PollData>(postDefault);
    const [createError, setCreateError] = useState<string>('');

    const reset = () => {
        setCreateError('');
        setMakePostClicked(false);
        setNewPost(postDefault);
    }
    
    const submitPost = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (newPost.optionOne === '' || newPost.optionTwo === ''){
            handleAlert("Both Option Fields Must be filled out");
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            dispatch<any>(createPost(newPost));
            reset();
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function action(arg0: AsyncThunkAction<PollData, PollData, { state?: unknown; dispatch?: Dispatch<AnyAction> | undefined; extra?: unknown; rejectValue?: unknown; serializedErrorType?: unknown; pendingMeta?: unknown; fulfilledMeta?: unknown; rejectedMeta?: unknown }>): any {
        throw new Error('Function not implemented.')
    }

    const handleAlert = (message: string) => {
        setCreateError(message)
    
        setTimeout(() => {
            setCreateError('');
        }, 1000);
      }

    return (
        <>
        <Grid.Row>
            <Button 
                size="small" 
                primary
                circular 
                animated='fade'
                style={{width: "3.25rem", height: "3.25rem" }}
                onClick={() => setMakePostClicked(true)}
            >
                <Button.Content visible>+</Button.Content>
                <Button.Content hidden>Post</Button.Content>
            </Button>
        </Grid.Row>
        <Modal 
        loading={isLoading}
            open={makePostClicked}
            onClose={() => {
                setMakePostClicked(false);
                reset()
            }}
            size="mini"
            dimmer={true}
        >
            <Modal.Header primary>
                Create A Poll
                <Button 
                    floated="right"
                    negative
                    size="tiny"
                    circular
                    onClick={() => {setMakePostClicked(false)}}
                >
                    <Button.Content>X</Button.Content>
                </Button>
            </Modal.Header>
            <Modal.Content>
        
            <Form loading={isLoading} onSubmit={(event) => submitPost(event)}>
                <Form.Input width={14} label='Option 1' placeholder='Enter a Contestant' onChange={(event) => {
                    setNewPost({...newPost, optionOne: event.target.value})
                }}/>
                <Form.Input width={14} label='Option 2' placeholder='Enter a Contestant' onChange={(event) => {
                    setNewPost({...newPost, optionTwo: event.target.value})
                }}/>
                <Button style={{margin: ".5rem 0"}}>Start a Battle</Button>
            </Form>
            </Modal.Content>
            <Modal.Description>

                {createError === ''
                    ?
                        <p style={{paddingBottom: "1rem", paddingLeft: "1rem", paddingRight: "1rem"}}>
                            Enter Options One and Two, and let your network vote to see who would win the battle!
                        </p>
                    :
                        <p style={{paddingBottom: "1rem", paddingLeft: "1rem", paddingRight: "1rem", color: 'red', fontWeight: "bold"}}>
                            {createError}
                        </p>
                }
            </Modal.Description>
        </Modal>
        </>
    )
}

export default MakePoll;


