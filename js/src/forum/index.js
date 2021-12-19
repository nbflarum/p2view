import {extend, override} from 'flarum/extend';
import app from 'flarum/app';

import Button from 'flarum/common/components/Button';
import HeaderSecondary from "flarum/components/HeaderSecondary";
import Post from 'flarum/models/Post';
import Model from 'flarum/Model';
import User from "flarum/models/User";
import payView from './payview';



app.initializers.add('jeffchen-payview', () => {
    
	payView();
	
});


