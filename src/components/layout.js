import React, { useState } from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql, Link } from "gatsby";
import { HelmetDatoCms } from "gatsby-source-datocms";
import { Location } from '@reach/router'
import { Lightbox } from './lightbox'

import "../styles/index.sass";

const TemplateWrapper = ({ children, location }) => {
	const [showMenu, setShowMenu] = useState(false);
	return (
		<StaticQuery
			query={graphql`
				query LayoutQuery {
					datoCmsSite {
						globalSeo {
							siteName
						}
						faviconMetaTags {
							...GatsbyDatoCmsFaviconMetaTags
						}
					}
					datoCmsHome {
						seoMetaTags {
							...GatsbyDatoCmsSeoMetaTags
						}
						introTextNode {
							childMarkdownRemark {
								html
							}
						}
					}
					datoCmsAboutPage {
						title
					}
					datoCmsArtPage {
						title
					}
					datoCmsMaow {
						title
					}
					allDatoCmsSocialProfile(sort: { fields: [position], order: ASC }) {
						edges {
							node {
								profileType
								url
							}
						}
					}
				}
			`}
			render={data => (
				<div className={`container${showMenu ? " is-open" : ""}`} data-pathname="">
					<HelmetDatoCms
						favicon={data.datoCmsSite.faviconMetaTags}
						seo={data.datoCmsHome.seoMetaTags}
					/>
					<div className="container__sidebar">
						<div className="sidebar">
							<div className="sidebar__title">
								<Link to="/">
									<img src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjYyIiB2aWV3Qm94PSIwIDAgNjIgNjIiIHdpZHRoPSI2MiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjMDBmIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0uMDAwNyAuMDAwMTM0KSI+PHBhdGggZD0ibTUwLjcyOSA1MC44MDE2NjU3Yy0uNTg0IDEuMjE1LTIuNzg2Ljk2Ni0zLjItLjE2LTEtNC4xNTMgNC42MjktMy4yMjMgMy4yLjE2Ii8+PHBhdGggZD0ibTI3Ljg5MyAyNC4zOTE5NjU3Yy0xLjAwNSAxLjA5OC00LjIwOSAzLjgwOC02LjE2NyA1LjcwNy41NC04Ljk0NSAxLjQ5My0xOC42MjMgMy45MjYtMjYuMzQ5MDAwMDMuMjU5LS4wNDUuMjc1LjE1Mi40OC4xNjEgMS4zNDMgNS4wOTIgMS41MTggOC40ODMwMDAwMyAxLjc2MSAxNC4wMTAwMDAwMy4wMzEuNzEuMjE2IDUuNzUgMCA2LjQ3MW0zMi4wMTctMjEuNDQwMDAwMDNjLTIuMzEzLjg3MS00LjM4NCAyLjE3OS02LjY1NyAzLjU0NmwtMS4yMzIuODExYy0xLjgwNiAxLjAzMy03LjQwOCA0LjcyNDAwMDAzLTkuMjQ2IDUuNzIzMDAwMDMtLjYwMy0zLjk0NTAwMDAzIDEuMjg4LTEyLjQ4OTAwMDAzLTMuODQtMTEuODQyMDAwMDMtMS4xODguNjk3LS43NzEgMi4xNDEtLjQ4IDQuMDAxLjU1NiAzLjU2Ni44NTkgNy4xMTYwMDAwMy42MzQgMTAuMjg1MDAwMDMtMi42MTggMi4yMzEtNS4zMjEgNC4yNjQtNy44NjMgNi4zOS0uMTM4LTIuODYtLjE4Ny02LjkzNS0uNDUzLTEwLjQzNS0uMjU1LTMuMzUxMDAwMDMtLjU0Ni02Ljg4MDAwMDAzLTEuNjAxLTguOTYwMDAwMDMtLjk2Ny0xLjkxMi00LjAyMi0zLjY0My01LjQ0LTEuNDQxLS4xNzguMjc3LS40NjMuNDUyLS40OC40ODItLjg5MiAxLjQyNi0xLjI0IDMuMzkyLTEuNiA1LjQzOS0uMzI2IDEuODUtLjcxNyAzLjg0MDAwMDAzLTEuMTE5IDUuOTIwMDAwMDMtLjU4OSAzLjAyMS0xLjAxNSA1Ljg3OC0xLjI4MSA4LjY0Mi0uMTM4IDEuNDM5LS41NzkgNS4yMjMtLjY0IDUuNzU5LS4yMTggMS44NzgtLjA0NCA0LjEyNC0uMzIxIDUuNzYzLTUuMDE2IDQuNzEzLTguMTcyIDguOTg5LTE0LjI5IDEyLjU1NS0xLjQ2NC44NTMtNC4wMDEuNzkxLTQuMDAxIDIuNTU5LjI4OCAxLjgwNyAzLjQ1NC45ODIgNC45OTkuMzQgNC4wNS0yLjE1NiA1LjQ3NC0zLjM4OSA4LjkxMS02Ljk2MiAxLjY0OS0xLjY2IDMuMDkyLTMuMjQzIDQuMjg4LTQuMzU0LS4wMDEgMS4yODItLjMyNiAzLjM5MS0uMjI2IDQuMTgyLjA1Ny40NTItLjI0MyAzLjUzNS0uMzIgNC45Ni0uMjY2IDQuOTA3LS4xNTcgMTAuMDQ3LjEwNCAxMy45OTMuMDMxLjg0OSAxLjcwNSAxLjc5NyAyLjkzNiAxLjM2OCAxLjY2NC0xLjQ3IDEuMDA2LTQuMDgxLjgtNi43MjItLjUwOC02LjUyOC0uMTgzLTEzLjQyNS4xNi0yMC4xNjIgMS4wMjEtMS40ODQgNS4zNTItNS4wNTUgNi40MDEtNi4yNC40MjUgNy4wOTQgMS4yOCAxNS4yNzcgMi40IDIzLjE3Ny4zNjQgMi41NzEuNTU2IDguNzgyIDQgNi41NTkuODA5LS45NDMtLjE4OS0yLjcwMi0uNDc5LTQuMDAxLS42MDMtMi42OTMtLjkwOC01LjI4MS0xLjI4MS03LjgxMi0xLjA0My03LjA4NC0uNTQtMTMuNDY0LTEuMjc5LTIwLjE2MyAyLjI1OC0yLjExMyA2LjY2LTYuMTUyIDcuNTIxLTYuNDQ4LjI0OSA3LjU5Ni4xNDIgMTUuMTk3LjQ3OSAyMS40OTEuMTAzIDEuODc3LjIyMiA0LjAwMy4zMjEgNi4wNzkuMTQ0IDMuMDE2LjA1OSA2LjA2MSAxLjI3OSA4LjE2MiAxLjA0OC4zMzkgMS40ODgtLjE0MyAyLjQtLjMyLjQwOC0yLjg1OC0uNjYxLTE1LjE0Mi0uNjM5LTE1Ljg0NC4yNDMtNy43MzktLjQ5My0xNS40ODcgMC0yMi41NjEgMy4yNDctMi40OTQgNy44LTUuMzc0IDEwLjc2LTcuMDY2MDAwMDMgMCAwIDQuOTg5LTMuMTYxIDYuNjA5LTMuOTUyLjg1My0uNDE5IDEuMzg1LS4xODEgMS42MDEtLjk2MS4zNzItMS4zNDctLjgzOC0yLjMxNi0xLjgzNS0xLjk0Ii8+PC9nPjwvc3ZnPg=="
									alt={data.datoCmsSite.globalSeo.siteName} width="52" height="52" />
								</Link>
							</div>
							<div
								className="sidebar__intro"
								dangerouslySetInnerHTML={{
									__html:
										data.datoCmsHome.introTextNode.childMarkdownRemark.html
								}}
							/>
							<ul className="sidebar__menu">
								<li>
									<Location>
										{({ location }) => {
											return <Link className={location.pathname.includes('/work')?"on":""} to="/">Design</Link>
										}}
									</Location>
								</li>
								<li>
									<Link to="/maow">{data.datoCmsMaow.title}</Link>
								</li>
								<li>
									<Link to="/art">{data.datoCmsArtPage.title}</Link>
								</li>
								<li>
									<Link to="/about">{data.datoCmsAboutPage.title}</Link>
								</li>
							</ul>
							<div className="sidebar__footer">
								<p>
									Based in Brussels, Belgium<br/>
									<a href="mailto:touvron.anna@gmail.com" target="_blank" rel="noopener noreferrer">touvron.anna@gmail.com</a><br/>
									<a href="tel:0032493859106" target="_blank" rel="noopener noreferrer">+32 (0)493 85 91 06</a>
								</p>
								<p>{new Date().getFullYear()} &copy; Annatou Studio</p>

								<p className="sidebar__social">
									{data.allDatoCmsSocialProfile.edges.map(({ node: profile }) => (
										<a
											key={profile.profileType}
											href={profile.url}
											rel="noopener noreferrer"
											target="blank"
											className={`social social--${profile.profileType.toLowerCase()}`}
										>
											<img
												src={`https://cdn.rawgit.com/encharm/Font-Awesome-SVG-PNG/master/white/svg/${profile.profileType.toLowerCase()}.svg`}
												alt={profile.profileType}
												height="36"
											/>
										</a>
									))}
								</p>
							</div>
						</div>
					</div>
					<div className="container__body">
						<div className="container__mobile-header">
							<div className="mobile-header">
								<div className="mobile-header__menu">
									<button
										onClick={e => {
											e.preventDefault();
											setShowMenu(!showMenu);
										}}
									/>
								</div>
								<div className="mobile-header__logo">
									<Link to="/">
										<img
											src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjYyIiB2aWV3Qm94PSIwIDAgNjIgNjIiIHdpZHRoPSI2MiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjMDBmIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0uMDAwNyAuMDAwMTM0KSI+PHBhdGggZD0ibTUwLjcyOSA1MC44MDE2NjU3Yy0uNTg0IDEuMjE1LTIuNzg2Ljk2Ni0zLjItLjE2LTEtNC4xNTMgNC42MjktMy4yMjMgMy4yLjE2Ii8+PHBhdGggZD0ibTI3Ljg5MyAyNC4zOTE5NjU3Yy0xLjAwNSAxLjA5OC00LjIwOSAzLjgwOC02LjE2NyA1LjcwNy41NC04Ljk0NSAxLjQ5My0xOC42MjMgMy45MjYtMjYuMzQ5MDAwMDMuMjU5LS4wNDUuMjc1LjE1Mi40OC4xNjEgMS4zNDMgNS4wOTIgMS41MTggOC40ODMwMDAwMyAxLjc2MSAxNC4wMTAwMDAwMy4wMzEuNzEuMjE2IDUuNzUgMCA2LjQ3MW0zMi4wMTctMjEuNDQwMDAwMDNjLTIuMzEzLjg3MS00LjM4NCAyLjE3OS02LjY1NyAzLjU0NmwtMS4yMzIuODExYy0xLjgwNiAxLjAzMy03LjQwOCA0LjcyNDAwMDAzLTkuMjQ2IDUuNzIzMDAwMDMtLjYwMy0zLjk0NTAwMDAzIDEuMjg4LTEyLjQ4OTAwMDAzLTMuODQtMTEuODQyMDAwMDMtMS4xODguNjk3LS43NzEgMi4xNDEtLjQ4IDQuMDAxLjU1NiAzLjU2Ni44NTkgNy4xMTYwMDAwMy42MzQgMTAuMjg1MDAwMDMtMi42MTggMi4yMzEtNS4zMjEgNC4yNjQtNy44NjMgNi4zOS0uMTM4LTIuODYtLjE4Ny02LjkzNS0uNDUzLTEwLjQzNS0uMjU1LTMuMzUxMDAwMDMtLjU0Ni02Ljg4MDAwMDAzLTEuNjAxLTguOTYwMDAwMDMtLjk2Ny0xLjkxMi00LjAyMi0zLjY0My01LjQ0LTEuNDQxLS4xNzguMjc3LS40NjMuNDUyLS40OC40ODItLjg5MiAxLjQyNi0xLjI0IDMuMzkyLTEuNiA1LjQzOS0uMzI2IDEuODUtLjcxNyAzLjg0MDAwMDAzLTEuMTE5IDUuOTIwMDAwMDMtLjU4OSAzLjAyMS0xLjAxNSA1Ljg3OC0xLjI4MSA4LjY0Mi0uMTM4IDEuNDM5LS41NzkgNS4yMjMtLjY0IDUuNzU5LS4yMTggMS44NzgtLjA0NCA0LjEyNC0uMzIxIDUuNzYzLTUuMDE2IDQuNzEzLTguMTcyIDguOTg5LTE0LjI5IDEyLjU1NS0xLjQ2NC44NTMtNC4wMDEuNzkxLTQuMDAxIDIuNTU5LjI4OCAxLjgwNyAzLjQ1NC45ODIgNC45OTkuMzQgNC4wNS0yLjE1NiA1LjQ3NC0zLjM4OSA4LjkxMS02Ljk2MiAxLjY0OS0xLjY2IDMuMDkyLTMuMjQzIDQuMjg4LTQuMzU0LS4wMDEgMS4yODItLjMyNiAzLjM5MS0uMjI2IDQuMTgyLjA1Ny40NTItLjI0MyAzLjUzNS0uMzIgNC45Ni0uMjY2IDQuOTA3LS4xNTcgMTAuMDQ3LjEwNCAxMy45OTMuMDMxLjg0OSAxLjcwNSAxLjc5NyAyLjkzNiAxLjM2OCAxLjY2NC0xLjQ3IDEuMDA2LTQuMDgxLjgtNi43MjItLjUwOC02LjUyOC0uMTgzLTEzLjQyNS4xNi0yMC4xNjIgMS4wMjEtMS40ODQgNS4zNTItNS4wNTUgNi40MDEtNi4yNC40MjUgNy4wOTQgMS4yOCAxNS4yNzcgMi40IDIzLjE3Ny4zNjQgMi41NzEuNTU2IDguNzgyIDQgNi41NTkuODA5LS45NDMtLjE4OS0yLjcwMi0uNDc5LTQuMDAxLS42MDMtMi42OTMtLjkwOC01LjI4MS0xLjI4MS03LjgxMi0xLjA0My03LjA4NC0uNTQtMTMuNDY0LTEuMjc5LTIwLjE2MyAyLjI1OC0yLjExMyA2LjY2LTYuMTUyIDcuNTIxLTYuNDQ4LjI0OSA3LjU5Ni4xNDIgMTUuMTk3LjQ3OSAyMS40OTEuMTAzIDEuODc3LjIyMiA0LjAwMy4zMjEgNi4wNzkuMTQ0IDMuMDE2LjA1OSA2LjA2MSAxLjI3OSA4LjE2MiAxLjA0OC4zMzkgMS40ODgtLjE0MyAyLjQtLjMyLjQwOC0yLjg1OC0uNjYxLTE1LjE0Mi0uNjM5LTE1Ljg0NC4yNDMtNy43MzktLjQ5My0xNS40ODcgMC0yMi41NjEgMy4yNDctMi40OTQgNy44LTUuMzc0IDEwLjc2LTcuMDY2MDAwMDMgMCAwIDQuOTg5LTMuMTYxIDYuNjA5LTMuOTUyLjg1My0uNDE5IDEuMzg1LS4xODEgMS42MDEtLjk2MS4zNzItMS4zNDctLjgzOC0yLjMxNi0xLjgzNS0xLjk0Ii8+PC9nPjwvc3ZnPg=="
											alt={data.datoCmsSite.globalSeo.siteName} width="32" height="32"
										/>
								</Link>
								</div>
							</div>
						</div>
						{children}
					</div>
					<Lightbox />
				</div>
			)}
		/>
	);
};

TemplateWrapper.propTypes = {
	children: PropTypes.object
};

export default TemplateWrapper;
