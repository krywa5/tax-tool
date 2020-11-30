import React, { useContext } from 'react';
import { Collapse } from '@material-ui/core';
import { AppContext } from 'context/UserContext';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    containerr: {
        display: 'flex',
    }
}))

const Netherlands = () => {
    const { selectedCountry, setSelectedCountry } = useContext(AppContext);
    const isSelected = selectedCountry === 'netherlands';
    const classes = useStyles();

    setSelectedCountry('netherlands');

    return (
        <div className={classes.containerr}>
            <Collapse in={true} component={'article'} timeout={1000}>
                <div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat quaerat necessitatibus debitis dolorum cumque excepturi a sequi pariatur voluptas eum culpa officiis velit ipsa quae quasi repellat adipisci cupiditate, ut earum, esse nostrum! Cumque officia vero, adipisci cupiditate sed nemo officiis ad error veniam quos magnam omnis quam quod reiciendis quaerat iusto dicta libero? Nisi quaerat incidunt eos consectetur aliquam, soluta nihil provident numquam vero ratione tempore. Modi fugiat dignissimos molestias, unde, nam provident, corrupti voluptate laborum commodi explicabo odio! Cumque corrupti numquam, minima consequatur, molestias maxime voluptatem dignissimos nostrum dolor libero iure saepe. Repellendus temporibus laborum voluptatibus eaque ea?</p>
                </div>
            </Collapse>
        </div>

    );
}

export default Netherlands;